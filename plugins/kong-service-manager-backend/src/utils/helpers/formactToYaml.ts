import yaml from 'js-yaml';

export function formactToYaml(yamlString:string){
    try {
        const data = yaml.load(yamlString);
        return data;
      } catch (err:any) {
        throw new Error (`impossible to transform the selected file [${err}]`)
      }
}