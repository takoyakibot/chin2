.PHONY: deploy

build:
	npm run build

sync:
	aws s3 sync build/ s3://alpaca-sandbag

deploy: build sync
