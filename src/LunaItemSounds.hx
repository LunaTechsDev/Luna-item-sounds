package;

import macros.MacroTools;
import mz.windows.Window_Message;
import mz.managers.PluginManager;
import utils.Fn;
import utils.Comment;
import mz.windows.Window_Message;
import mz.sprites.Sprite_Base;

using core.StringExtensions;
using Std;

class LunaItemSounds {
 public static var textSpeed: Int = 2;

 public static function main() {
  trace(Sprite_Base);
  // Plugin parameters can be include here as an internal call.
  // MacroTools.includeJsLib("./src/TestPluginParams.js");

  var parameters: Any = PluginManager.parameters("TestPlugin");
  textSpeed = Fn.getByArrSyntax(parameters, "Text Speed");
  trace(textSpeed);
 }
}
