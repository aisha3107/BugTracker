using BugTrack.DAL;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace BugTrack.Controllers
{
    public class FilesController : ApiController
    {
        private BugTrackEntities db = new BugTrackEntities();

        [HttpPost]
        public void Upload()
        {
            int taskId = Convert.ToInt32(HttpContext.Current.Request.Form["TaskId"]);            
            var req = HttpContext.Current.Request;
            
            foreach (string fileN in req.Files)
            {
                HttpPostedFile file = req.Files[fileN];

                int filelength = file.ContentLength;
                byte[] databytes = new byte[filelength];
                file.InputStream.Read(databytes, 0, filelength);

                var doc = new Files()
                {
                    TaskId = taskId,
                    FileName = file.FileName,
                    FileContent = databytes,
                    Uploaded = DateTime.Now,
                };
                db.Files.Add(doc);
            }
            try
            {
                db.SaveChanges();
            }
            catch(DbEntityValidationException exc)
            {

            }
        }

        [HttpGet]
        public HttpResponseMessage Download(int fileId)
        {
            var doc = db.Files.Where(x => x.Id == fileId).FirstOrDefault();
            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(doc.FileContent)
            };
            result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
            {
                FileName = doc.FileName
            };
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            return result;
        }

        [HttpPut, ResponseType(typeof(void))]
        public void Delete(int fileId)
        {
            var fileRecord = db.Files.Where(x => x.Id == fileId).FirstOrDefault();
            fileRecord.IsDeleted = true;
            db.Entry(fileRecord).State = System.Data.Entity.EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }        
    }
}
