# OLLAMA

By access the [Ollama](https://ollama.com/) website, we run the install command.

```shell
curl -fsSL https://ollama.com/install.sh | sh
```

Now we can run the serve locally:

```shell
ollama serve
```

We also have:

```shell
# list of installed models
ollama list
# stop model
ollama stop <model-name>
# kill server
pkill ollama
# remove model
ollama rm <model-name>
```

Alternative of manual model remove

```shell
# CAUTION: this will remove all models
sudo rm -r /usr/share/ollama/.ollama/models/blobs/
```
