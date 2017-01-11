using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BugTrack.DAL;
using Microsoft.AspNet.Identity;

namespace BugTrack.Controllers
{
    [RoutePrefix("api/UserBoards")]
    public class UserBoardsController : ApiController
    {
        private BugTrackEntities db = new BugTrackEntities();

        // GET: api/UserBoards
        [HttpGet]
        public dynamic GetUserBoardsByUserId()
        {
            string userId = User.Identity.GetUserId();

            return db.UserBoards
                .Where(x => x.UserId == userId)
                .Select(x => new
                {
                    x.Id,
                    x.Title,
                    x.UserId,
                    x.IsArchive,
                    Tasks = x.UserBoardTasks.Select(y => new
                    {
                        y.TaskId,
                        ProjectTaskTitle = y.ProjectTasks.Title,
                        ProjectTaskTypesId = y.ProjectTasks.TaskTypeId,
                        ProjectTaskTypesTitle = y.ProjectTasks.TaskTypes.Name,
                        ProjectTaskStatusId = y.ProjectTasks.StatusId,
                        ProjectTaskStatusTitle = y.ProjectTasks.Status.Name,
                        ProjectId = y.ProjectTasks.ProjectId,
                        ProjectTitle = y.ProjectTasks.Projects.Name,
                        StartedOn = y.ProjectTasks.StartedOn,
                        ProjectFiles = y.ProjectTasks.Files.Where(file => file.IsDeleted != true)
                            .Select(file => new
                            {
                                file.Id,
                                file.FileName,
                            }),
                    }).ToList()
                })
                .ToList();
        }

        // GET: api/UserBoards/5
        [ResponseType(typeof(UserBoards))]
        public IHttpActionResult GetUserBoards(int id)
        {
            var userBoards = db.UserBoards
                .Where(x=>x.Id == id)
                .Select(x => new
                {
                    x.Id,
                    x.Title,
                    x.UserId,
                    x.IsArchive,
                    Tasks = x.UserBoardTasks.Select(y => new
                    {
                        y.TaskId,
                        ProjectTaskTitle = y.ProjectTasks.Title,
                        ProjectTaskTypesId = y.ProjectTasks.TaskTypeId,
                        ProjectTaskTypesTitle = y.ProjectTasks.TaskTypes.Name,
                        ProjectTaskStatusId = y.ProjectTasks.StatusId,
                        ProjectTaskStatusTitle = y.ProjectTasks.Status.Name,
                        ProjectId = y.ProjectTasks.ProjectId,
                        ProjectTitle = y.ProjectTasks.Projects.Name,
                        StartedOn = y.ProjectTasks.StartedOn,
                        ProjectFiles = y.ProjectTasks.Files.Where(file => file.IsDeleted != true)
                            .Select(file => new
                            {
                                file.Id,
                                file.FileName,
                            }),
                    }).ToList()
                })
                .FirstOrDefault();

            if (userBoards == null)
            {
                return NotFound();
            }

            return Ok(userBoards);
        }

        // PUT: api/UserBoards/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserBoards(int id, UserBoards userBoards)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userBoards.Id)
            {
                return BadRequest();
            }

            db.Entry(userBoards).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserBoardsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/UserBoards
        [ResponseType(typeof(UserBoards))]
        public IHttpActionResult PostUserBoards(UserBoards userBoards)
        {
            // пока незнаю логику создания доски пользователь или админ создает
            // возможно надо будет добавить userBoards.UserId = User.Identity.GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserBoards.Add(userBoards);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = userBoards.Id }, userBoards);
        }

        // DELETE: api/UserBoards/5
        [ResponseType(typeof(UserBoards))]
        public IHttpActionResult DeleteUserBoards(int id)
        {
            UserBoards userBoards = db.UserBoards.Find(id);
            if (userBoards == null)
            {
                return NotFound();
            }

            db.UserBoards.Remove(userBoards);
            db.SaveChanges();

            return Ok(userBoards);
        }

        [HttpGet, Route("AddProjectTaskToUserBoard")]
        public void AddProjectTaskToUserBoard(int taskId, int userBoardId)
        {
            var userBoardTask = new UserBoardTasks() {
                TaskId = taskId,
                UserBoardId = userBoardId                
            };
            db.UserBoardTasks.Add(userBoardTask);
            db.SaveChanges();
        }

        [HttpDelete, Route("DeleteProjectTaskFromUserBoard"), ResponseType(typeof(UserBoards))]
        public IHttpActionResult DeleteTaskFromBoard(int taskId, int userBoardId)
        {
            var userBoardTask = db.UserBoardTasks
                .Where(x => x.TaskId == taskId && x.UserBoardId == userBoardId)
                .FirstOrDefault();
            if (userBoardTask == null)
            {
                return NotFound();
            }

            db.UserBoardTasks.Remove(userBoardTask);
            db.SaveChanges();

            return Ok(userBoardTask);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserBoardsExists(int id)
        {
            return db.UserBoards.Count(e => e.Id == id) > 0;
        }
    }
}