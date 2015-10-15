import SongListEntity from '../entities/SongListEntity';

/**
 * recent songs store service
 * @name recentSongsStore
 * @param {request} request
 * @param {entityMapper} entityMapper
 * @returns {SongListEntity}
 */
function recentSongsStore (request, entityMapper) {
  'ngInject';

  const API_REQUEST_PATH = '/api/v1/accountedge/users/recentsongs';
  return {
    /**
     * fetch songs list from account recent songs endpoint
     * @name recentSongsStore#fetch
     * @return {SongListEntity}
     */
    async fetch() {
      return entityMapper(await request.get(API_REQUEST_PATH), SongListEntity);
    },
  };
}

export default recentSongsStore;
