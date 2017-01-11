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
    public class TaskTypesController : ApiController
    {
        private BugTrackEntities db = new BugTrackEntities();

        // GET: api/TaskTypes
        public dynamic GetTaskTypes()
        {
            return db.TaskTypes
                .Select(x=>new { x.Id, x.Name })
                .ToList();
        }
        
        // PUT: api/TaskTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTaskTypes(int id, TaskTypes taskTypes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != taskTypes.Id)
            {
                return BadRequest();
            }

            db.Entry(taskTypes).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskTypesExists(id))
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

        // POST: api/TaskTypes
        [ResponseType(typeof(TaskTypes))]
        public IHttpActionResult PostTaskTypes(TaskTypes taskTypes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TaskTypes.Add(taskTypes);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = taskTypes.Id }, taskTypes);
        }

        // DELETE: api/TaskTypes/5
        [ResponseType(typeof(TaskTypes))]
        public IHttpActionResult DeleteTaskTypes(int id)
        {
            TaskTypes taskTypes = db.TaskTypes.Find(id);
            if (taskTypes == null)
            {
                return NotFound();
            }

            db.TaskTypes.Remove(taskTypes);
            db.SaveChanges();

            return Ok(taskTypes);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TaskTypesExists(int id)
        {
            return db.TaskTypes.Count(e => e.Id == id) > 0;
        }
    }
}