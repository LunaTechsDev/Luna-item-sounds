package;

import rm.scenes.Scene_Equip;
import rm.managers.SceneManager;
import rm.managers.SoundManager;
import rm.types.RPG.MetaData;
import core.Types.JsFn;
import rm.scenes.Scene_Item;
import rm.types.RM.AudioParameters;
import rm.managers.AudioManager;
import core.Amaryllis;
import rm.Globals;
import utils.Fn;
import utils.Comment;

using core.StringExtensions;
using StringTools;

class LunaItemSounds {
 public static var textSpeed: Int = 2;

 public static function main() {
  var params: Any = Globals.Plugins.filter((plugin) -> {
   return ~/<LunaItmSnds>/ig.match(plugin.description);
  });

  var ItemEmitter = Amaryllis.createEventEmitter();

  ItemEmitter.on(EmitterTypes.ITEM_SNDS, (se: AudioParameters) -> {
   AudioManager.playSe(se);
  });

  Comment.title("Scene_Item");

  var _SceneItem_playSeForItem: JsFn = Fn.getPrProp(Scene_Item,
   "playSeForItem");
  Fn.setPrProp(Scene_Item, "playSeForItem", () -> {
   var sceneItem: Scene_Item = Fn.self;
   var re = ~/\s*<se:\s*(.*)\s+(\d+)\s+(\d+)\s*>\s*/ig;
   var item: MetaData = sceneItem.item();
   var match = re.match(item.note);
   if (match) {
    var audioParams: AudioParameters = {
     pos: 0,
     pan: 0,
     name: re.matched(1).trim(),
     volume: cast Fn.parseIntJs(re.matched(2), 10),
     pitch: cast Fn.parseIntJs(re.matched(3), 10),
    };

    ItemEmitter.emit(EmitterTypes.ITEM_SNDS, audioParams);
   } else {
    _SceneItem_playSeForItem.call(Fn.self);
   }
  });
  var oldPlayEquip: JsFn = Fn.getField(SoundManager, "playEquip");
  Fn.setField(SoundManager, "playEquip", () -> {
   var scene: Dynamic = SceneManager.currentScene;
   var self = Fn.self;
   if (Fn.instanceof(scene, Scene_Equip)) {
    var re = ~/\s*<se:\s*(.*)\s+(\d+)\s+(\d+)\s*>\s*/ig;
    if (re.match(scene._itemWindow.item().note)) {
     var audioParams: AudioParameters = {
      pos: 0,
      pan: 0,
      name: re.matched(1).trim(),
      volume: cast Fn.parseIntJs(re.matched(2), 10),
      pitch: cast Fn.parseIntJs(re.matched(3), 10),
     };
     ItemEmitter.emit(EmitterTypes.ITEM_SNDS, audioParams);
    } else {
     oldPlayEquip.call(Fn.self);
    }
   } else {
    oldPlayEquip.call(Fn.self);
   }
  });
 }
}

enum abstract EmitterTypes(String) from String to String {
 public var ITEM_SNDS = "ItemSounds";
}
