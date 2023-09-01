export enum GitlabPipelinesStatus {
    pending = "pending", 
    running = "running", 
    success = "success", 
    failed = "failed", 
    canceled = "canceled", 
    skipped = "skipped", 
    manual = "manual", 
    created = "created", 
    blocked = "blocked",
    scheduled = "scheduled",  
    waitingForResource = "waiting_for_resource", 
    preparing = "preparing", 
    pendingApproval = "pending_approval", 
    approvalPending = "approval_pending", 
    approvalBlocked = "approval_blocked", 
    manualyCreated = "manualy_created", 
    failedWithWarnings = "failed_with_warnings" 
}