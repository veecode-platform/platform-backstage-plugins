import axios from 'axios';

export class GitlabServiceInfo {
 
  constructor(
    public host: string,
    private token: string
  ){}

  public async getOrgsGitlab(): Promise<string[]> {
    const GITLAB_ORGS_URL = `https://${this.host}/api/v4/groups`;
    
    const headers = {
      'Private-Token': this.token,
    };
  
    const orgsList: string[] = []; 
    let page = 1;
    let morePages = true;
  
    try {
      while (morePages) {
        const response = await axios.get(GITLAB_ORGS_URL, {
          headers,
          params: {
            per_page: 100,
            page,
          },
        });
  
        if (response.status === 200) {
          const orgs = response.data;
          orgsList.push(...orgs.map((org: any) => org.full_path as string)); 
          
          morePages = orgs.length === 100;
          page += 1;
        } else {
          morePages = false;
        }
      }
  
      return orgsList.length > 0 ? orgsList : ['Not Orgs'];
    } catch (error) {
      return ['Not orgs'];
    }
  }

  public async getUserGitlab():Promise<string> {
 
    const GITLAB_USER_URL = `https://${this.host}/api/v4/user`;
  
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
  
    try {
      const response = await axios.get(GITLAB_USER_URL, { headers });
  
      if (response.status === 200) {
        const owner = response.data.username;
        return owner;
      }
      return 'Not found';
    } catch (error) {
      return 'Not Found';
    }
  }

}
