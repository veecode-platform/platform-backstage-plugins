import axios from 'axios';

export class GithubServiceInfo {

  constructor(
    public host: string,
    private token: string
  ){}

  public async getOrgsGithub():Promise<string[]> {
    const GITHUB_ORGS_URL = `https://api.${this.host}/user/orgs`;

    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    const orgsList = [];
  
    try {
      const response = await axios.get(GITHUB_ORGS_URL, { headers });
  
      if (response.status === 200) {
        const orgs = response.data;
        for (const org of orgs) {
          orgsList.push(org.login as string);
        }
        return orgsList;
      }
      orgsList.push('Not orgs');
      return orgsList;
    } catch (error) {
      orgsList.push('Not orgs');
      return orgsList;
    }
  }

  public async getUserGithub():Promise<string> {
 
    const GITHUB_USER_URL = `https://api.${this.host}/user`;
  
    const headers = {
      Authorization: `token ${this.token}`,
    };
  
    try {
      const response = await axios.get(GITHUB_USER_URL, { headers });
  
      if (response.status === 200) {
        const owner = response.data.login;
        return owner;
      }
      return 'Not found';
    } catch (error) {
      return 'Not Found';
    }
  }
}
