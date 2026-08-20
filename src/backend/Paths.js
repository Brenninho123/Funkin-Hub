import path from 'path';

class Paths {
  constructor() {
    this.root = process.cwd();
    this.assets = path.join(this.root, 'assets');
    this.mods = path.join(this.root, 'mods');
    this.data = path.join(this.root, 'data');
    this.songs = path.join(this.assets, 'songs');
    this.characters = path.join(this.assets, 'characters');
    this.images = path.join(this.assets, 'images');
    this.sounds = path.join(this.assets, 'sounds');
  }

  getAssetPath(...subPaths) {
    return path.join(this.assets, ...subPaths);
  }

  getModPath(...subPaths) {
    return path.join(this.mods, ...subPaths);
  }

  getDataPath(...subPaths) {
    return path.join(this.data, ...subPaths);
  }

  getSongPath(songName, fileName) {
    return path.join(this.songs, songName, fileName);
  }

  getCharacterPath(characterName) {
    return path.join(this.characters, `${characterName}.json`);
  }
}

export default new Paths();
