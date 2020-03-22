.PHONY: build
build:
	npm run build

.PHONY: clean
clean:
	rm -rf build

.PHONY: deploy
deploy: clean build
	cd build && \
	  git init && \
	  git add . && \
	  git commit --allow-empty-message -m "" && \
	  git push -f git@github.com:larose/conjugueur.git HEAD:gh-pages

.PHONY: start
start:
	npm start