"use client";

import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

interface MapModalProps {
    isOpen: boolean;
    onClose: () => void;
    location: string;
    patientName: string;
}

export const MapModal = ({ isOpen, onClose, location, patientName }: MapModalProps) => {
    // موقع مدينة جنين
    const center = useMemo(() => ({ lat: 32.4636, lng: 35.2933 }), []);

    const [showInfo, setShowInfo] = useState(true);

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[80vh]">
                <DialogHeader>
                    <DialogTitle className="text-right">موقع المريض - {patientName}</DialogTitle>
                </DialogHeader>

                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                    <GoogleMap
                        mapContainerStyle={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "12px",
                        }}
                        center={center}
                        zoom={14}
                        options={{
                            mapTypeId: "roadmap",
                            disableDefaultUI: false,
                            zoomControl: true,
                            streetViewControl: false,
                            fullscreenControl: true,
                        }}
                    >
                        <Marker
                            position={center}
                            onClick={() => setShowInfo(!showInfo)}
                            icon={{
                                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                scaledSize: new google.maps.Size(40, 40),
                            }}
                        >
                            {showInfo && (
                                <InfoWindow onCloseClick={() => setShowInfo(false)}>
                                    <div
                                        style={{
                                            direction: "rtl",
                                            padding: "8px",
                                            minWidth: "180px",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontWeight: "bold",
                                                marginBottom: "6px",
                                                fontSize: "15px",
                                                color: "#ef4444",
                                            }}
                                        >
                                            📍 {patientName}
                                        </h3>
                                        <p
                                            style={{
                                                fontSize: "13px",
                                                color: "#666",
                                                marginBottom: "6px",
                                            }}
                                        >
                                            {location || "جنين، فلسطين"}
                                        </p>
                                        <div
                                            style={{
                                                paddingTop: "4px",
                                                borderTop: "1px solid #ddd",
                                                fontSize: "12px",
                                                color: "#999",
                                            }}
                                        >
                                            انقر على العلامة لإخفاء التفاصيل
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    </GoogleMap>
                </LoadScript>
            </DialogContent>
        </Dialog>
    );
};
