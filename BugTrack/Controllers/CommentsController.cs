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

namespace BugTrack.Controllers
{
    public class CommentsController : ApiController
    {
        private BugTrackEntities db = new BugTrackEntities();

        // GET: api/Comments
        public dynamic GetCommentsByTaskId(int projectTaskId)
        {
            return db.Comments
                .Where(x=>x.ProjectTaskId == projectTaskId)
                .Select(x => new
            {
                x.Id,
                x.Text,
                x.CreateDate,
                x.ProjectTaskId,
                Author = x.AspNetUsers.UserName
            }).ToList();
        }

        // GET: api/Comments/5
        public IHttpActionResult GetComments(int id)
        {
            var comment = db.Comments
                .Where(x=>x.Id == id)
                .Select(x=>new {
                    x.Id,
                    x.Text,
                    x.CreateDate,
                    x.ProjectTaskId,
                    TaskTitle = x.ProjectTasks.Title,
                    ProjectId = x.ProjectTasks.ProjectId,
                    ProjectTitle = x.ProjectTasks.Projects.Name,
                    Author = x.AspNetUsers.UserName
                })
                .FirstOrDefault();

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        // PUT: api/Comments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComments(int id, Comments comments)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != comments.Id)
            {
                return BadRequest();
            }

            db.Entry(comments).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentsExists(id))
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

        // POST: api/Comments
        [ResponseType(typeof(Comments))]
        public IHttpActionResult PostComments(Comments comments)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Comments.Add(comments);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = comments.Id }, comments);
        }

        // DELETE: api/Comments/5
        [ResponseType(typeof(Comments))]
        public IHttpActionResult DeleteComments(int id)
        {
            Comments comments = db.Comments.Find(id);
            if (comments == null)
            {
                return NotFound();
            }

            db.Comments.Remove(comments);
            db.SaveChanges();

            return Ok(comments);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CommentsExists(int id)
        {
            return db.Comments.Count(e => e.Id == id) > 0;
        }
    }
}