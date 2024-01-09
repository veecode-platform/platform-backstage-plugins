import { Router } from "express";
import { RouterOptions } from "./router";
import { PostgresPluginRepository } from "../modules/plugins/repositories/Knex/KnexPluginRepository";
import { PluginDto } from "../modules/plugins/dtos/PluginDto";

export async function createPluginRouter(options: RouterOptions,): Promise<Router> {

    const pluginRepository = await PostgresPluginRepository.create(
        await options.database.getClient(),
    );
    const router = Router();

    router.get('/', async (_, response) => {
        const plugins = await pluginRepository.getPlugins();
        response.status(200).json({ status: 'ok', plugins: plugins });
      });
    
      router.get('/:id', async (request, response) => {
        const pluginId = request.params.id;
        const plugin = await pluginRepository.getPluginById(pluginId);
        response.status(200).json({ status: 'ok', plugin: plugin });
      });
    
      router.post('/', async (request, response) => {
        const plugin: PluginDto = request.body.plugin;
        const res = await pluginRepository.createPlugin(plugin);
        response.status(201).json({ status: 'ok', plugin: res });
      });
    
      router.patch('/:id', async (request, response) => {
        const pluginId = request.params.id;
        const plugin: PluginDto = request.body.plugin;
        const res = await pluginRepository.patchPlugin(pluginId, plugin);
        response.status(200).json({ status: 'ok', plugin: res });
      });
    
      router.delete('/:id', async (request, response) => {
        const pluginId = request.params.id;
        const res = await pluginRepository.deletePlugin(pluginId);
        response.status(204).json({ status: 'ok', plugin: res });
      });
    
    

    return router;

}