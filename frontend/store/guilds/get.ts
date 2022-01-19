import {
  Module,
  VuexModule,
  Mutation,
  Action
} from 'vuex-module-decorators'

import { $axios } from '@/utils/nuxt-instance'
import { Paginate } from '@/models'

@Module({
  name: 'guilds/get',
  stateFactory: true,
  namespaced: true
})

export default class Guilds extends VuexModule {
  @Action
  public async getGuilds(payload: Paginate) {
    try {
      return await $axios.$get(`guilds/${payload.page}/${payload.limit}`)
        .then((response) => {
          if (!response) 
            throw new Error(response);

          return {
            data: response.result.data,
            status: response.status,
            total: response.result.meta.last_page
          };
        })
        .catch(() => {
          return {
            data: 'Error',
            status: 'SEARCH_NOTFOUND',
            total: 0
          };
        });
    } catch(err) {
      return err;
    }
  }
}
