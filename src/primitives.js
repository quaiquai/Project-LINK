
class Primitives{
  constructor(type, sz){
    this.primitiveType = type;
    sz ? this.size = sz : this.size = null;
  }

  genBuffers(){
    this.vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  associateBuffers(){
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuffer);
    var coord = gl.getAttribLocation(program, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.nBuffer);
    var norms = gl.getAttribLocation(program, "a_normal");
    gl.vertexAttribPointer(norms, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(norms);
  }

  genUniforms(){
    this.u_model = gl.getUniformLocation(program, "u_model");
    this.u_color = gl.getUniformLocation(program, "u_color");
  }

  setUniforms(){
    gl.uniformMatrix4fv(this.u_model, false, flatten(this.model));
    gl.uniform4fv(this.u_color, this.color);
  }
}

class Cube extends Primitives{
  constructor(sz){
    super("Cube", sz);
    this.vertices = [
      // Front face
      -sz, 0,  sz,
      sz, 0,  sz,
      -sz,  sz * 2,  sz,
      sz,  sz * 2,  sz,

      // Back face
      -sz, 0, -sz,
      -sz,  sz * 2, -sz,
       sz,  0, -sz,
       sz, sz * 2, -sz,

      // Top face
      -sz,  sz * 2, -sz,
      sz,  sz * 2,  -sz,
       -sz,  sz * 2,  sz,
       sz,  sz * 2, sz,

      // Bottom face
      -sz, 0, -sz,
       sz, 0, -sz,
       -sz, 0,  sz,
      sz, 0,  sz,

      // Right face
       sz, 0, -sz,
       sz,  0, sz,
       sz,  sz * 2,  -sz,
       sz, sz * 2,  sz,

      // Left face
      -sz, 0, -sz,
      -sz, 0,  sz,
      -sz,  sz * 2,  -sz,
      -sz,  sz * 2, sz
    ]
    this.normals = [
      //Front face
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      //Back face
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,

      //Top face
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      //Bottom face
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      //Right face
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

      //left face
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      -1, 0, 0
    ];
    this.color = [
      Math.random(),  Math.random(),  Math.random(),  1.0,    // Front face: white
    ];
    this.genBuffers();
    this.genUniforms();
    this.model = mat4();
  }
}

class Wall extends Primitives{
  constructor(bottom_l, top_r, dir){
    super("Wall");
    this.bottom_corner = bottom_l;
    this.top_right = top_r;
    this.direction = dir;
    this.vertices = [
      this.bottom_corner[0], this.bottom_corner[1], this.bottom_corner[2],
      this.bottom_corner[0], this.top_right[1], this.bottom_corner[2],
      this.top_right[0], this.bottom_corner[1], this.top_right[2],
      this.top_right[0], this.top_right[1], this.top_right[2]
    ];
    this.color = [
      Math.random(),  Math.random(),  Math.random(),  1.0
    ];
    this.normals = [
      dir[0], dir[1], dir[2],
      dir[0], dir[1], dir[2],
      dir[0], dir[1], dir[2],
      dir[0], dir[1], dir[2]
    ];
    this.genBuffers();
    this.genUniforms();
    this.model = mat4();
  }
}

class Flat extends Primitives{
  constructor(bottom_l, top_r, h, dir){
    super("Flat");
    this.bottom_corner = bottom_l;
    this.top_right = top_r;
    this.direction = dir;
    this.height = h
    this.vertices = [
      this.bottom_corner[0], h, this.bottom_corner[2],
      this.bottom_corner[0], h, this.top_right[2],
      this.top_right[0], h, this.bottom_corner[2],
      this.top_right[0], h, this.top_right[2]
    ];
    this.color = [
      Math.random(),  Math.random(),  Math.random(),  1.0
    ];
    this.normals = [
      dir[0], dir[1], dir[2],
      dir[0], dir[1], dir[2],
      dir[0], dir[1], dir[2],
      dir[0], dir[1], dir[2]
    ];
    this.genBuffers();
    this.genUniforms();
    this.model = mat4();
  }
}