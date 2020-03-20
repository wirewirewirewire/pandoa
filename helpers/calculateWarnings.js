import latLngDistance from "./latLngDistance";

const diffCalc = (position, track) => {
  const distance = latLngDistance(
    track.lat,
    track.lng,
    position.lat,
    position.lng,
    "M"
  );

  const timeDifference = Math.abs(
    Date.parse(position.time) - Date.parse(track.time)
  );
  return { distance, timeDifference };
};

const calcConnections = ({ positions, tracks }) => {
  const connectedPoints = positions.map((position, i) => {
    var matches = tracks.filter((track, i) => {
      const diff = diffCalc(position, track);
      if (diff.distance <= 50 && diff.timeDifference <= 1000 * 60 * 60 * 24) {
        return { track, distance: diff.distance };
      } else {
        return null;
      }
    });

    matches.sort((a, b) => {
      return Date.parse(a.time) - Date.parse(b.time);
    });

    let duration = 0;
    if (matches.length !== 0) {
      duration = Math.abs(
        Date.parse(matches[0].time) -
          Date.parse(matches[matches.length - 1].time)
      );
    }
    return { position, matches, duration };
  });
  return connectedPoints;
};

/*
var concatPoints = [];
connectedPoints.forEach((position, i) => {
  const foundSimilar = concatPoints.findIndex(existingPoint => {
    const diff = diffCalc(position, existingPoint);
    if (diff.distance <= 100 && diff.timeDifference <= 1000 * 60 * 60 * 2) {
      return true;
    }
  });
  if (foundSimilar === -1) {
    concatPoints.push(position);
  }
});

const connectedLines = connectedPoints.map((point, index) => {
  console.log(connectedLines, point);
  if (point.matches && point.matches.length >= 1) {
    return (
      <>
        {point.matches.map((e, i) => (
          <Polyline
            key={i}
            coordinates={[
              { latitude: point.position.lat, longitude: point.position.lng },
              { latitude: e.lat, longitude: e.lng }
            ]}
            strokeColor="rgba(255,0,0,0.1)" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={["rgba(255,0,0,0.1)", "rgba(255,168,12,0.1)"]}
            strokeWidth={15.5}
          />
        ))}
      </>
    );
  }
});*/

export default function calculateWarnings({ positions, tracks }) {
  return calcConnections({ positions, tracks });
}
