export default function Lighting() {
  return (
    <>
      {/* Ambient Light - Warm Yellow */}
      <ambientLight intensity={0.8} color="#fff6dd" />

      {/* Main Directional Light - Gold */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.4}
        color="#e7c873"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill Light - Soft */}
      <directionalLight
        position={[-5, 6, -3]}
        intensity={0.6}
        color="#ffd6a3"
      />

      {/* Point Light - Accent */}
      <pointLight
        position={[0, 4, 4]}
        intensity={0.5}
        color="#fff6dd"
        distance={20}
      />
    </>
  )
}