import http from "node:http";
const server = http.createServer((req, res) => {
    const { url, method } = req;
    if (url === "/" && method === "GET") {
        return res.end(JSON.stringify({ method }));
    }
    if (url === "/nova-tela" && method === "GET") {
        return res.end(JSON.stringify({ status: 200, body: "Nova tela" }));
    }
    res.statusCode = 404;
    return res.end(JSON.stringify({ status: 404, body: "404 (Not Found)" }));
});
server.listen(3000, () => {
    console.log("Server: ON");
});
//# sourceMappingURL=index.js.map