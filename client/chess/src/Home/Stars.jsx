import {useState,useRef,Suspense} from 'react'
import { Canvas,useFrame } from '@react-three/fiber'
import { Points,PointMaterial,Preload } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
const Stars = (props) => {
    const ref=useRef();
    const sphere=random.inSphere(new Float32Array(props.number),{radius:1.2});
    useFrame((state,delta)=>{
        ref.current.rotation.x+=delta/10;
        ref.current.rotation.y+=delta/10;
    })

  return (
    <group rotation={[0,Math.PI/6,Math.PI/4]}>
        <Points ref={ref} positions={sphere} stride={3} {...props}>
            <PointMaterial
             size={0.0027} 
             transparent
             color='#white'
             sizeAttenuation={true}
             />

        </Points>
    </group>
  )
}
const StarsCanvas=({number})=>{
    return(
    <div className='stars'>
        <Canvas
            camera={{position:[0,0,1]}}
            gl={{preserveDrawingBuffer:true}}
        >
            <Suspense>

            <Stars number={number}/>
            </Suspense>
            <Preload all/>
        </Canvas>
            
    </div>
    )

}

export default StarsCanvas;
