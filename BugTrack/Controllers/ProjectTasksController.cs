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
using BugTrack.Models;
using BugTrack.BLL;

namespace BugTrack.Controllers
{
    [RoutePrefix("api/ProjectTasks")]
    public class ProjectTasksController : ApiController
    {
        private BugTrackEntities db = new BugTrackEntities();
        private ProjectTaskTreeGrid treeBuilder = new ProjectTaskTreeGrid();

        // GET: api/ProjectTasks
        [HttpGet]
        public dynamic GetProjectTasks(bool IsIncludeNodes = false)
        {
            if (!IsIncludeNodes)
                return db.ProjectTasks
                    .Select(x => new
                    {
                        x.Id,
                        x.Title,
                        x.StartedOn,
                        x.EndedOn,
                        x.Url,
                        x.StatusId,
                        StatusName = x.Status.Name,
                        x.TaskTypeId,
                        TaskTypeName = x.TaskTypes.Name,
                        x.AssignedUserId,
                        AssignedUserName = x.AspNetUsers.UserName,
                        x.EstimatedEndsOn,
                        x.UserId,
                        AuthorUserName = x.AspNetUsers1.UserName,
                        x.ParentTaskId,
                        x.ProjectId,
                        ProjectName = x.Projects.Name,
                        x.Description,
                        x.CreatedOn
                    });
            else
            {
                return treeBuilder.GetTasksTreeGrid();
            }
        }

        // GET: api/ProjectTasks/5
        public IHttpActionResult GetProjectTasks(int id)
        {
            var projectTasksItem = db.ProjectTasks
                .Where(x => x.Id == id)
                .Select(x => new
                {
                    x.Id,
                    x.Title,
                    x.StartedOn,
                    x.EndedOn,
                    x.Url,
                    x.StatusId,
                    x.TaskTypeId,
                    x.AssignedUserId,
                    x.EstimatedEndsOn,
                    x.UserId,
                    x.ParentTaskId,
                    x.ProjectId,
                    x.Description,
                    x.CreatedOn,
                    StatusName = x.Status.Name,
                    TaskTypeName = x.TaskTypes.Name,
                    AssignedUserName = x.AspNetUsers.UserName,
                    AuthorUserName = x.AspNetUsers1.UserName,
                    ProjectName = x.Projects.Name,
                    CommentsList = x.Comments.Select(comm => new
                    {
                        comm.Id,
                        comm.Text,
                        comm.CreateDate,
                        comm.UserId,
                        Author = comm.AspNetUsers.UserName
                    }).ToList(),
                    ProjectTaskHistoryList = x.ProjectTaskHistory.Select(hist => new
                    {
                        hist.Id,
                        hist.UserId,
                        AuthorName = hist.AspNetUsers.UserName,
                        hist.ChangedOn,
                        hist.EstimatedEndsOn,
                        hist.AssignedUserId,
                        hist.StartedOn,
                        hist.EndedOn,
                        hist.TaskTypeId,
                        hist.Title,
                        hist.StatusId,
                        StatusName = hist.Status.Name,
                        hist.ParentTaskId,
                        hist.ProjectId,
                        hist.Description
                    }).ToList(),
                    Files = x.Files.Where(file => file.IsDeleted != true).Select(file => new
                    {
                        file.Id,
                        file.FileName,
                        file.Uploaded
                    }).ToList(),
                })
                .FirstOrDefault();

            if (projectTasksItem == null)
            {
                return NotFound();
            }

            return Ok(projectTasksItem);
        }

        // PUT: api/ProjectTasks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProjectTasks(int id, ProjectTasks projectTasks)
        {
            projectTasks.CreatedOn = DateTime.Now;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != projectTasks.Id)
            {
                return BadRequest();
            }

            db.Entry(projectTasks).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTasksExists(id))
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

        // POST: api/ProjectTasks
        [ResponseType(typeof(ProjectTasks))]
        public IHttpActionResult PostProjectTasks(ProjectTasks projectTasks)
        {
            projectTasks.CreatedOn = DateTime.Now;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.ProjectTasks.Add(projectTasks);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = projectTasks.Id }, projectTasks);
        }

        // DELETE: api/ProjectTasks/5
        [ResponseType(typeof(ProjectTasks))]
        public IHttpActionResult DeleteProjectTasks(int id)
        {
            ProjectTasks projectTasks = db.ProjectTasks.Find(id);
            if (projectTasks == null)
            {
                return NotFound();
            }

            db.ProjectTasks.Remove(projectTasks);
            db.SaveChanges();

            return Ok(projectTasks);
        }

        [HttpGet, Route("SearchByParams")]
        public dynamic SearchByParams(string title = null, string description = null)
        {
            return db.ProjectTasks.Where(x => x.Title.Contains(title) ||
                x.Description.Contains(description))
                .Select(x => new
                {
                    x.Id,
                    x.Title,
                    x.StartedOn,
                    x.EndedOn,
                    x.Url,
                    x.StatusId,
                    StatusName = x.Status.Name,
                    x.TaskTypeId,
                    TaskTypeName = x.TaskTypes.Name,
                    x.AssignedUserId,
                    AssignedUserName = x.AspNetUsers.UserName,
                    x.EstimatedEndsOn,
                    x.UserId,
                    AuthorUserName = x.AspNetUsers1.UserName,
                    x.ParentTaskId,
                    x.ProjectId,
                    ProjectName = x.Projects.Name,
                    x.Description,
                    x.CreatedOn
                })
                .ToList();
        }

        [HttpGet, Route("GetProjectTasksByProjectId")]
        public dynamic GetProjectTasksByProjectId(int projectId)
        {
            return db.ProjectTasks.Where(x => x.ProjectId == projectId)
                .Select(x => new
                {
                    x.Id,
                    x.Title,
                    x.StartedOn,
                    x.EndedOn,
                    x.Url,
                    x.StatusId,
                    StatusName = x.Status.Name,
                    x.TaskTypeId,
                    TaskTypeName = x.TaskTypes.Name,
                    x.AssignedUserId,
                    AssignedUserName = x.AspNetUsers.UserName,
                    x.EstimatedEndsOn,
                    x.UserId,
                    AuthorUserName = x.AspNetUsers1.UserName,
                    x.ParentTaskId,
                    x.ProjectId,
                    ProjectName = x.Projects.Name,
                    x.Description,
                    x.CreatedOn
                })
                .ToList();
        }

        [HttpGet, Route("GetTasksHierarchyByProjectId")]
        public dynamic GetTasksHierarchyByProjectId(int id)
        {
            return treeBuilder.GetTasksTreeGridByProjectId(id);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProjectTasksExists(int id)
        {
            return db.ProjectTasks.Count(e => e.Id == id) > 0;
        }

        //TEST
        //[HttpGet, Route("GetTree")]
        //public dynamic GetTree()
        //{
        //    var tr = new ProjectTreeGrid();
        //    return tr.GetTreeGrid();
        //}
        //[HttpGet, Route("GetTaskGrid")]
        //public dynamic GetTaskTree()
        //{
        //    var tr = new ProjectTaskTreeGrid();
        //    return tr.GetTasksTreeGrid();
        //}
    }
}