SOURCE_FILES = src/* public/* # 依存するソースファイル

build: $(SOURCE_FILES)
	npm run build

sync:
	aws s3 sync build/ s3://alpacasandbag

deploy: build sync
