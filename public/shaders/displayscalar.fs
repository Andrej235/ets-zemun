uniform sampler2D read;

uniform vec3 scale;
varying vec2 texCoord;

//background
void main()
{
    float edgeProximityMultiplier = 1.0;
    edgeProximityMultiplier *= smoothstep(0.0, 0.1, texCoord.x);
    edgeProximityMultiplier *= 1.0 - smoothstep(0.9, 1.0, texCoord.x);
    edgeProximityMultiplier *= smoothstep(0.0, 0.1, texCoord.y);
    edgeProximityMultiplier *= 1.0 - smoothstep(0.9, 1.0, texCoord.y);

    gl_FragColor = vec4(vec3(edgeProximityMultiplier) * scale * texture2D(read, texCoord).xxx, 0);
}
