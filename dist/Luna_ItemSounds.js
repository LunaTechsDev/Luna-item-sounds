//=============================================================================
// Luna_ItemSounds.js
//=============================================================================
//=============================================================================
// Build Date: 2020-08-22 18:50:41
//=============================================================================
//=============================================================================
// Made with LunaTea -- Haxe
//=============================================================================

//=============================================================================
//  Contact Information
//=============================================================================
/*
*
*
*/

// Generated by Haxe 4.1.3
/*:
@author LunaTechs - Kino
@plugindesc Allows you to add sounds to items that you equip or use. <LunaItmSnds>
@target MV MZ
@help
//=============================================================================
//  Notetag
//=============================================================================
*
* <se: name volume pitch>
* Example: <se: Applause2 100 100>
*/
(function ($global) { "use strict"
class EReg {
	constructor(r,opt) {
		this.r = new RegExp(r,opt.split("u").join(""))
	}
	match(s) {
		if(this.r.global) {
			this.r.lastIndex = 0
		}
		this.r.m = this.r.exec(s)
		this.r.s = s
		return this.r.m != null;
	}
	matched(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched")
		}
	}
}
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index)
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static now() {
		return Date.now();
	}
}
class LunaItemSounds {
	static main() {
		let _this = $plugins
		let _g = []
		let _g1 = 0
		while(_g1 < _this.length) {
			let v = _this[_g1]
			++_g1
			if(new EReg("<LunaItmSnds>","ig").match(v.description)) {
				_g.push(v)
			}
		}
		let ItemEmitter = new PIXI.utils.EventEmitter()
		ItemEmitter.on("ItemSounds",function(se) {
			AudioManager.playSe(se)
		})
		
//=============================================================================
// Scene_Item
//=============================================================================
      
		let _SceneItem_playSeForItem = Scene_Item.prototype.playSeForItem
		Scene_Item.prototype.playSeForItem = function() {
			let sceneItem = this
			let re = new EReg("\\s*<se:\\s*(.*)\\s+(\\d+)\\s+(\\d+)\\s*>\\s*","ig")
			if(re.match(sceneItem.item().note)) {
				let audioParams = StringTools.trim(re.matched(1))
				let string = re.matched(2)
				let audioParams1 = parseInt(string,10)
				let string1 = re.matched(3)
				let audioParams2 = { pos : 0, pan : 0, name : audioParams, volume : audioParams1, pitch : parseInt(string1,10)}
				return ItemEmitter.emit("ItemSounds",audioParams2);
			} else {
				return _SceneItem_playSeForItem.call(this);
			}
		}
		let oldPlayEquip = SoundManager.playEquip
		SoundManager.playEquip = function() {
			let scene = SceneManager._scene
			this
			if(((scene) instanceof Scene_Equip)) {
				let re = new EReg("\\s*<se:\\s*(.*)\\s+(\\d+)\\s+(\\d+)\\s*>\\s*","ig")
				if(re.match(scene._itemWindow.item().note)) {
					let audioParams = StringTools.trim(re.matched(1))
					let string = re.matched(2)
					let audioParams1 = parseInt(string,10)
					let string1 = re.matched(3)
					let audioParams2 = { pos : 0, pan : 0, name : audioParams, volume : audioParams1, pitch : parseInt(string1,10)}
					return ItemEmitter.emit("ItemSounds",audioParams2);
				} else {
					return oldPlayEquip.call(this);
				}
			} else {
				return oldPlayEquip.call(this);
			}
		}
	}
}
class StringTools {
	static isSpace(s,pos) {
		let c = HxOverrides.cca(s,pos)
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		let l = s.length
		let r = 0
		while(r < l && StringTools.isSpace(s,r)) ++r
		if(r > 0) {
			return HxOverrides.substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		let l = s.length
		let r = 0
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r
		if(r > 0) {
			return HxOverrides.substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static trim(s) {
		return StringTools.ltrim(StringTools.rtrim(s));
	}
}
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message)
		this.message = message
		this.__previousException = previous
		this.__nativeException = native != null ? native : this
	}
	get_native() {
		return this.__nativeException;
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value)
			return e;
		}
	}
}
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native)
		this.value = value
	}
}
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0
		this.array = array
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
class _$LTGlobals_$ {
}
class utils_Fn {
	static proto(obj) {
		return obj.prototype;
	}
}
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance)
}
LunaItemSounds.main()
})({})
