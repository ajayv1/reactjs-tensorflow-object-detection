const drawRect = (predictions, ctx) => {
  for (let object of predictions) {
    const [x, y, w, h] = object.bbox;
    const text = object.class; 

    // set styling
    var gradient = ctx.createLinearGradient(0, 0, 170, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5" ,"blue");
    gradient.addColorStop("1.0", "red");

    // Fill with gradient
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 5;
    ctx.font = "20px Verdana";
    ctx.fillStyle=gradient;

    // draw rect and text
    ctx.beginPath();
    ctx.fillText(text, x, y);
    ctx.rect(x, y, w, h);
    ctx.stroke();
  };
};

export default drawRect;