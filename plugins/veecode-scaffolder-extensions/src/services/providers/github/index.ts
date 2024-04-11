/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// eslint-disable-next-line @backstage/no-undeclared-imports
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
