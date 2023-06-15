import * as monaco from 'monaco-editor'

export function supplementMarkers(markers) {
  return markers.map((marker) => ({
    ...marker,
    relatedInformation: marker.relatedInformation
      ? marker.relatedInformation.map((info) => ({
          ...info,
          resource: monaco.Uri.parse(info.resource),
        }))
      : undefined,
  }))
}
