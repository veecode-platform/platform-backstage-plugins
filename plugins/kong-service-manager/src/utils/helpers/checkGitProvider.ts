export function checkGitProvider(host:string):string{
    switch(true){
        case host.includes('github'):
            return 'Github';
        case host.includes('gitlab'):
            return 'Gitlab';
        default:
            return 'Git Provider'
    }
}