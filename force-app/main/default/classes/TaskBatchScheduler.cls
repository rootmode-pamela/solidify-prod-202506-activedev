public class TaskBatchScheduler implements Schedulable {

 
/*  
 * Apex scheduler class that can be used to easily schedule new instances
 * of the batch task creation class.
 * */


    public String taskName; 
    public TaskCreator apexBatch;
    
    public TaskBatchScheduler(String taskName) {
        apexBatch = new TaskCreator(taskName);
    }
    
    public void execute(SchedulableContext ctx) 
    {
        if(taskName<>'') {
        	Database.executeBatch(apexBatch);
        }
    }  
}