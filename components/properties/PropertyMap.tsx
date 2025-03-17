"use client";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { findCountryByCode } from "@/utils/countries";
import CountryDetails from "../card/CountryDetails";

// Leaflet makes direct call to DOM when loaded, that is why it is not compatible for SSR. React does not render Leaflet layers to the DOM, this rendering is done by Leaflet itself. React only renders a <div> element when rendering the MapContainer component and the contents of UI layers components.

const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";

const markerIcon = icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});


function PropertyMap({code}:{code:string}) {
 
 const defaultLocation = [51.505, -0.09] as [number, number];
 const location = findCountryByCode(code)?.location as [number, number]

  return <section className="mt-4">
   <div className="mb-4">
   <h4 className="head-5 mb-1 capitalize">Where you will be staying</h4>
   <CountryDetails code={code} />
   </div>
   <MapContainer scrollWheelZoom={false} zoomControl={false} center={location || defaultLocation} zoom={7} className="h-[50vh] rounded-md z-0 relative">
   <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ZoomControl position="bottomright" />
        <Marker position={location || defaultLocation} icon={markerIcon} />
   </MapContainer>
  </section>;
}


export default PropertyMap;
