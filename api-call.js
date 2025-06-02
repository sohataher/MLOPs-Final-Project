// async function getPredictedLabel(processed_t) {
//   // TODO: Call your model's api here
//   // and return the predicted label
//   // Possible labels: "up", "down", "left", "right", null
//   // null means stop & wait for the next gesture
//   // For now, we will return a random label
//   const labels = ["up", "down", "left", "right"];
//   const randomIndex = Math.floor(Math.random() * labels.length);
//   const randomLabel = labels[randomIndex];
//   console.log("Predicted label:", randomLabel);
//   return randomLabel;
// }

// async function getPredictedLabel(processed_t) {
//   const gestureToDirection = {
//     like: "up",
//     dislike: "down",
//     two_up: "left",
//     one: "right",
//     stop: null,
//     peace: null,
//     peace_inverted: null,
//     stop_inverted: null,
//     rock: null,
//     call: null,
//     ok: null,
//     mute: null,
//     palm: null,
//     fist: null,
//     two_up_inverted: null,
//     three: null,
//     three2: null,
//     four: null
//   };

//   try {
//     const response = await fetch("https://mlops-handgesture-api-production-bd6e.up.railway.app/predict", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ landmarks: processed_t })
//     });

//     if (!response.ok) {
//       console.error("API response error:", response.statusText);
//       return null;
//     }

//     const data = await response.json();
//     const gesture = data.gesture;  // <- FIX: correct key from API response

//     const direction = gestureToDirection[gesture] || null;

//     console.log("Gesture:", gesture, "| Mapped to:", direction);
//     return direction;

//   } catch (error) {
//     console.error("Error calling prediction API:", error);
//     return null;
//   }
// }

async function getPredictedLabel(processed_t) {
  const gestureToDirection = {
    like: "up",
    dislike: "down",
    peace: "left",
    ok: "right",
    stop: null,
    two_up: null,
    peace_inverted: null,
    stop_inverted: null,
    rock: null,
    call: null,
    one: null,
    mute: null,
    palm: null,
    fist: null,
    two_up_inverted: null,
    three: null,
    three2: null,
    four: null
  };

  try {
    // Flatten the landmarks before sending to API
    const flatLandmarks = processed_t.flatMap(landmark => [landmark.x, landmark.y, landmark.z]);

    const response = await fetch("https://mlops-handgesture-api-production-bd6e.up.railway.app/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ landmarks: flatLandmarks })  // <- send flattened landmarks
    });

    if (!response.ok) {
      console.error("API response error:", response.statusText);
      return null;
    }

    const data = await response.json();
    const gesture = data.gesture;

    const direction = gestureToDirection[gesture] || null;

    console.log("Gesture:", gesture, "| Mapped to:", direction);
    return direction;

  } catch (error) {
    console.error("Error calling prediction API:", error);
    return null;
  }
}
