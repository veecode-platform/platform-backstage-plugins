import { FileContent } from "@veecode-platform/backstage-plugin-vee-common";

export const templateDataMock : FileContent[] = [
  {
    name: "mkdocs.yml",
    relativePath: "",
    content: `site_name: Java Template\n
site_description: Template using Java and Springboot\n\n
nav:
  - Introduction: index.md\n
plugins:
  - techdocs-core
    `,
    originalFormat: "yml",
  },
  {
    name: "template.yaml",
    relativePath: "",
    content: `apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: springboot-3-template-github
  title: Spring Boot 3 Template
  description: Create a springboot microservice
  annotations:
    backstage.io/techdocs-ref: dir:.
  tags:
    - recommended
    - platform-templates
    - java
spec:
  owner: veecode/platform
  type: microservice
  parameters:
    - title: Project Configuration
      required:
        - componentId
        - owner
      properties:
        componentId:
          title: Project name
          type: string
          description: Name of the project
          pattern: '^([a-z0-9]|[.]|[_]|[-])*$'
          ui:autofocus: true
          ui:field: EntityNamePicker
        owner:
          title: Owner
          type: string
          description: Owner of the component
          ui:field: OwnerPicker
          ui:options:
            allowedKinds:
              - Group
        description:
          title: Description
          type: string
          description: Help others understand what this application is for.
          ui:options: rows:5
        artifact:
          title: Artifact
          type: string
          description: Java Artifact
          default: "demo"
        javaVersion:
          title: Java version
          type: string
          description: Specifies the java version
          default: "17"
          enum:
            - "17"
          enumNames:
            - "17"
        applicationPort:
          title: Application Port
          type: string
          description: Name of the project
          default: "8080"

    `,
    originalFormat: "yaml",
},
{
    name: "index.md",
    relativePath: "docs/",
    content: `#Este é um exemplo de markdow`,
     originalFormat: "md"
},
{
    name: "README.md",
    relativePath: "/skeleton",
    content: "#Esse é o REDME.md",
    originalFormat: "md"
},
{
  name: "graddle-wrapper.properties",
  relativePath: "/skeleton/gradle",
  content: `
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https://services.gradle.org/distributions/gradle-8.3-bin.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
  `,
  originalFormat: "properties"
}
];
