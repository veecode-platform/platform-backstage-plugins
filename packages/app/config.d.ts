/*
 * Copyright 2022 The Backstage Authors
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

/** Configuration for the devportal plugin behavior */
export interface Config {
    /**
    * Configuration for scaffolder towards various external repository provider systems
    * @visibility frontend
    */
    scaffolder?: {
      /** Integration configuration for GitHub */
      github?: Array<{
        /**
         * The hostname of the given GitHub instance
         * @visibility frontend
         */
        host: string;
        /**
         * Token used to authenticate requests.
         * @visibility frontend
         */
        token?: string;
      }>;
  
      /** Integration configuration for Gitlab */
      gitlab?: Array<{
        /**
         * The hostname of the given Gitlab instance
         * @visibility frontend
         */
        host: string;
        /**
         * Token used to authenticate requests.
         * @visibility frontend
         */
        token?: string;
      }>;
    };
  }