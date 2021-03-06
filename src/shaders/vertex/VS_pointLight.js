var VS_pointLighting = `
	attribute vec3 coordinates;
	attribute vec3 a_normal;
	attribute vec2 a_texcoord;

	uniform mat4 u_model;
	uniform mat4 u_view;
	uniform mat4 u_projection;
	uniform vec3 u_lightPosition;
	uniform vec3 u_viewPosition;

	uniform mat4 lightModel;
	uniform mat4 lightView;
	uniform mat4 lightProjection;

	varying vec3 v_normal;
	varying vec3 v_surfaceToLight;
	varying vec3 v_surfaceToView;
	varying vec2 v_texcoord;
	varying vec4 v_positionFromLight;

	void main(){
		vec4 position = vec4(u_projection * u_view * u_model * vec4(coordinates, 1.0));
		gl_Position = position;
		gl_PointSize = 20.0;
		vec3 surfaceWorldPosition = (u_model * vec4(coordinates, 1.0)).xyz; //position of the primitives surface
		v_normal = mat3(u_model) * a_normal;
		v_surfaceToLight = u_lightPosition - surfaceWorldPosition; //direction vector from light to surface of primitive
		v_surfaceToView = u_viewPosition - surfaceWorldPosition; //direction vector from view to surface of primitive
		v_positionFromLight = lightProjection * lightView * lightModel * vec4(coordinates, 1.0);
		v_texcoord = a_texcoord;
	}`;
