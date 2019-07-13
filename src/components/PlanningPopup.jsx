import React from 'react';

const PlanningInfo  = (props) => {
    const { popupInfo } = this.props.popupInfo;
    return (
        popupInfo && (
        <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={() => this.setState({popupInfo: null})}
        >
            <CityInfo info={popupInfo} />
        </Popup>
        )
    );
}