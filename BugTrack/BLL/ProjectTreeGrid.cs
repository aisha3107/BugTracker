using BugTrack.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugTrack.BLL
{
    public class ProjectTreeGrid
    {
        BugTrackEntities db = new BugTrackEntities();

        List<dynamic> treeGrid = new List<dynamic>();

        List<int> addedProjects = new List<int>();

        public dynamic GetTreeGrid()
        {
            //отсортировать по ParentId (null корневые)         
            var allProjects = db.Projects.OrderBy(x => x.ParentId ?? 0).ToList();
            //в самый первый запуск нет парента поэтому какой то объект пустой передаем
            var parentNodeFirst = treeGrid.FirstOrDefault();
            AddRecursively(allProjects, ref parentNodeFirst);

            return treeGrid;
        }

        private void AddRecursively(ICollection<Projects> projects1,
            ref dynamic parentNode)
        {
            foreach (var projectItem in projects1)
            {
                var parentProjectId = projectItem.ParentId ?? 0;
                var node = new object();

                if (!IsInTree(projectItem.Id))
                {
                    node = new
                    {
                        projectItem.Id,
                        projectItem.Name,
                        projectItem.ParentId,
                        Nodes = new List<dynamic>(),
                    };
                    if (parentProjectId == 0)
                        treeGrid.Add(node);
                    else
                    {
                        parentNode.Nodes.Add(node);
                    }
                    addedProjects.Add(projectItem.Id);

                    if (projectItem.Projects1.Count > 0)
                    {
                        AddRecursively(projectItem.Projects1, ref node);
                    }
                }
            }
        }

        private bool IsInTree(int projectId)
        {
            return addedProjects.Contains(projectId);
        }


        public dynamic GetHierarchyByProjectId(int projectID)
        {
            //взять данные по проекту       
            var selectedProject = db.Projects.Where(x => x.Id == projectID)
                .FirstOrDefault();

            //при первой вставке определяется структура объекта в дереве
            treeGrid.Add(new
            {
                ProjectId = selectedProject.Id,
                ProjectTitle = selectedProject.Name,
                ProjectNodes = new List<dynamic>(),
                TaskNodes = new List<dynamic>(),
            });

            var parentNodeFirst = treeGrid.FirstOrDefault();
            AddProjectAndTasksRecursively(selectedProject.Projects1, 
                selectedProject.ProjectTasks.Where(x=>x.ParentTaskId == null).ToList(), 
                ref parentNodeFirst);

            return treeGrid;
        }

        private void AddProjectAndTasksRecursively(ICollection<Projects> projects1,
            ICollection<ProjectTasks> projectTasks,
            ref dynamic parentNode)
        {
            foreach(var projectItem in projects1)
            {
                var projectNode = new object();

                projectNode = new

                {
                    ProjectId = projectItem.Id,
                    ProjectTitle = projectItem.Name,
                    ProjectNodes = new List<dynamic>(),
                    TaskNodes = new List<dynamic>(),
                };

                parentNode.ProjectNodes.Add(projectNode);

                if(projectItem.Projects1.Count > 0 || projectItem.ProjectTasks.Count > 0)
                {
                    AddProjectAndTasksRecursively(projectItem.Projects1,
                        projectItem.ProjectTasks.Where(x => x.ParentTaskId == null).ToList(),
                        ref projectNode);
                }
            }

            foreach(var taskItem in projectTasks)
            {
                var taskNode = new object();

                taskNode = new {
                    TaskId = taskItem.Id,
                    TaskTitle = taskItem.Title,
                    ProjectId = taskItem.ProjectId,
                    ParentTaskId = taskItem.ParentTaskId,
                    TaskNodes = new List<dynamic>()
                };

                parentNode.TaskNodes.Add(taskNode);

                if(taskItem.ProjectTasks1.Count > 0)
                {
                    AddProjectAndTasksRecursively(new List<Projects>(),
                        taskItem.ProjectTasks1,
                        ref taskNode);
                }
            }            
        }
    }
}