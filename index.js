const BUY_CAKE = "BUY_CAKE"; // action name

// create an action creator -> function that returns an action
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first Redux action",
  };
}
