import { getFailedResponse, processResponse } from './client';
import { ProjectData } from '../hooks/useProjects';
import client from './client';

const endpoint = '/projects';

const saveProject = async (project: ProjectData) => {
  try {
    return processResponse(await client.post(endpoint, project));
  } catch (error) {
    return getFailedResponse(error);
  }
};

export default { saveProject };
