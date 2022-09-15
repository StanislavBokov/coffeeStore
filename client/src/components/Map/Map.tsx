// @ts-nocheck

import React from 'react'
// import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
// import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
export const Map = () => {
  const position = [51.505, -0.09]

  return (
    <div>Заглушка</div>
    // <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    //   {/* <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   <Marker position={position}>
    //     <Popup>
    //     A pretty CSS3 popup. <br /> Easily customizable.
    //     </Popup>
    //   </Marker> */}
    // </MapContainer>
  )
}
// class Map extends React.Component {
//   render() {
//     return (
//       <LeafletMap
//         center={[50, 10]}
//         zoom={6}
//         maxZoom={10}
//         attributionControl={true}
//         zoomControl={true}
//         doubleClickZoom={true}
//         scrollWheelZoom={true}
//         dragging={true}
//         animate={true}
//         easeLinearity={0.35}
//       >
//         <TileLayer
//           url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//         />
//         <Marker position={[50, 10]}>
//           <Popup>
//             Popup for any custom information.
//           </Popup>
//         </Marker>
//       </LeafletMap>
//     );
//   }
// }

// export default Map