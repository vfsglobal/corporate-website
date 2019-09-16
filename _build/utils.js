module.exports.get_file_extension = function(file_name) {
  var file_name_parts = file_name.split(".");

  return file_name_parts[file_name_parts.length - 1];
};

module.exports.async_for_each = async function(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    return_val = await callback(arr[i], i, arr);
  }
};
