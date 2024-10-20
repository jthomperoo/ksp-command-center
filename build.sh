#!/bin/bash

set -e

zip_name="ksp-command-center.zip"

rm -rf dist/ "$zip_name"
mkdir -p dist/

cd app && npm ci && npm run build && cd ..

cp -r server/* dist/
cp -r app/dist dist/app
zip -r "$zip_name" dist/
