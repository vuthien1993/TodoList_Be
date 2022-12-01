using System;
public class TodoItem
{
    public long Id { get; set; }
    public long month { get; set; }
    public long time { get; set; }
    public string Tasks { get; set; }
    public bool IsDone { get; set; }
    public bool IsMyday { get; set; }
    public bool IsPlanned { get; set; }
    public bool IsImportant { get; set; }
    public bool IsTasks { get; set; }
    public bool timeOut { get; set; }
    public DateTime timed { get; set; } = DateTime.Today;

}
