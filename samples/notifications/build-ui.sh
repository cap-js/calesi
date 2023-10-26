#!/bin/bash

set -e

cd ../../incidents-app/app/incidents
ui5 build --include-task=generateManifestBundle --include-task=generateCachebusterInfo --clean-dest
cd dist
npx bestzip incidents.zip *
cd ../../../../samples/notifications

rm -rf gen/ui-resources/
mkdir -p gen/ui-resources/

mv ../../incidents-app/app/incidents/dist/incidents.zip gen/ui-resources