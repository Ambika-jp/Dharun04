async function enhanceImage(tensorImage) {
    const model = await tf.loadGraphModel('https://your-model-path/model.json');
    const enhanced = model.predict(tensorImage.expandDims(0));
    return enhanced.squeeze(); // return enhanced tensor
  }
  