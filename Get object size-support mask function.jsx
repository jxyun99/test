/* //////////////////////////////Get object size-support mask function/////////////////////////////////// */
function NO_CLIP_BOUNDS(the_obj) {
	var NO_CLIP_OBJECTS_AND_MASKS = new Array();
	GET_NO_CLIP_OBJECTS_AND_MASKS(the_obj);
	var v_left = new Array();
	var g_left = new Array();
	var v_top = new Array();
	var g_top = new Array();
	var v_right = new Array();
	var g_right = new Array();
	var v_bottom = new Array();
	var g_bottom = new Array();
	for (var i = 0; i < NO_CLIP_OBJECTS_AND_MASKS.length; i += 1) {
		g_left[i] = NO_CLIP_OBJECTS_AND_MASKS[i].geometricBounds[0];
		v_left[i] = NO_CLIP_OBJECTS_AND_MASKS[i].visibleBounds[0];
		g_top[i] = NO_CLIP_OBJECTS_AND_MASKS[i].geometricBounds[1];
		v_top[i] = NO_CLIP_OBJECTS_AND_MASKS[i].visibleBounds[1];
		g_right[i] = NO_CLIP_OBJECTS_AND_MASKS[i].geometricBounds[2];
		v_right[i] = NO_CLIP_OBJECTS_AND_MASKS[i].visibleBounds[2];
		g_bottom[i] = NO_CLIP_OBJECTS_AND_MASKS[i].geometricBounds[3];
		v_bottom[i] = NO_CLIP_OBJECTS_AND_MASKS[i].visibleBounds[3];
	}
	var v_L = MIN_IN_ARRAY(v_left);
	var g_L = MIN_IN_ARRAY(g_left);
	var v_T = MAX_IN_ARRAY(v_top);
	var g_T = MAX_IN_ARRAY(g_top);
	var v_R = MAX_IN_ARRAY(v_right);
	var g_R = MAX_IN_ARRAY(g_right);
	var v_B = MIN_IN_ARRAY(v_bottom);
	var g_B = MIN_IN_ARRAY(g_bottom);
	return [g_L, g_T, g_R, g_B, v_L, v_T, v_R, v_B];

	function GET_NO_CLIP_OBJECTS_AND_MASKS(the_obj) {
		if (IS_CLIP(the_obj)) {
			NO_CLIP_OBJECTS_AND_MASKS.push(the_obj.pageItems[0]);
			return;
		}
		if (the_obj.constructor.name == "GroupItem") {
			try {
				var N_sub_obj = the_obj.pageItems.length;
				for (var i = 0; i < N_sub_obj; i += 1) {
					GET_NO_CLIP_OBJECTS_AND_MASKS(the_obj.pageItems[i]);
				}
			} catch(error) {

}
			return;
		}
		NO_CLIP_OBJECTS_AND_MASKS.push(the_obj);
		return;
	}
}

function IS_CLIP(the_obj) {
	try {
		if (the_obj.constructor.name == "GroupItem") {
			if (the_obj.clipped) {
				return true;
			}
		}
	} catch(error) {

}
	return false;
}

function MAX_IN_ARRAY(the_array) {
	var MAX = the_array[0];
	for (var i = 0; i < the_array.length; i += 1) {
		if (the_array[i] > MAX) {
			MAX = the_array[i]
		}
	}
	return MAX;
}

function MIN_IN_ARRAY(the_array) {
	var MIN = the_array[0];
	for (var i = 0; i < the_array.length; i += 1) {
		if (the_array[i] < MIN) {
			MIN = the_array[i]
		}
	}
	return MIN;
}