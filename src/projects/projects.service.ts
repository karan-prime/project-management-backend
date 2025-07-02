import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsGateway } from '../notifications/projects.gateway';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private projectsGateway: ProjectsGateway,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    const project = await createdProject.save();
    this.projectsGateway.handleProjectCreated(project);
    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projectModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project | null> {
    const project = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
    if (project) {
      this.projectsGateway.handleProjectUpdate(project);
    }
    return project;
  }

  async remove(id: string): Promise<any> {
    const project = await this.projectModel.findByIdAndDelete(id).exec();
    if (project) {
      this.projectsGateway.handleProjectDeleted(project);
    }
    return project;
  }
}
