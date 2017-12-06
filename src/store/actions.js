import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import {shuffle} from 'common/js/util'

function findIndex(list, song) {
    return list.findIndex(item => {
        return item.id === song.id
    })
}

export const selectPlay = ({ commit, state }, { list, index }) => {
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULL_SCREEN, true)

    if(state.mode === playMode.random) {
        let randomlist = shuffle(list)
        commit(types.SET_PLAYLIST, randomlist)
        index = findIndex(randomlist, list[index])
    }else {
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)

}

export const randomPlay = ({commit, state}, {list}) => {
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAY_MODE, playMode.random)
    let randomlist = shuffle(list)
    commit(types.SET_PLAYLIST, randomlist)
    commit(types.SET_CURRENT_INDEX, 0)

}

export const insertSong = ({commit, state}, {song}) => {
  // debugger
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let currentSong = state.playlist[currentIndex]

  let fpIndex = findIndex(playlist, song)
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  if (fpIndex > -1) {
     if (fpIndex > currentIndex) {
       //要加上1, 因为刚才的插入，导致数组长度+1
       playlist.splice(fpIndex + 1, 1)
     } else {
       playlist.splice(fpIndex, 1)
       currentIndex--
     }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (fsIndex > currentSIndex) {
       sequenceList.splice(fsIndex + 1, 1)
    } else {
      sequenceList.splice(fsIndex, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
}
