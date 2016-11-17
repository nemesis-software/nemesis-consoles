package com.nemesis.console.helpline.server.app.msg;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.atmosphere.config.service.AtmosphereHandlerService;
import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.Broadcaster;
import org.atmosphere.cpr.BroadcasterFactory;
import org.atmosphere.cpr.Serializer;
import org.atmosphere.handler.AbstractReflectorAtmosphereHandler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.Map;

@AtmosphereHandlerService
public class WebSocketChatHandler extends AbstractReflectorAtmosphereHandler {

    protected final Logger LOG = LogManager.getLogger(getClass());

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void onRequest(final AtmosphereResource ar) throws IOException {
        final String broadcasterId = ar.getRequest().getPathInfo().substring(ar.getRequest().getPathInfo().lastIndexOf("/") + 1);

        if (ar.getRequest().getMethod().equals("GET")) {
            jsonGet(broadcasterId, ar);
        } else if (ar.getRequest().getMethod().equals("PUT")) {
            jsonPut(broadcasterId, ar);
        } else if (ar.getRequest().getMethod().equals("POST")) {
            jsonPost(broadcasterId, ar);
        } else if (ar.getRequest().getMethod().equals("DELETE")) {
            jsonDelete(broadcasterId, ar);
        }
    }

    public void jsonGet(final String broadcasterId, final AtmosphereResource ar) {

        ar.getResponse().setCharacterEncoding(ar.getRequest().getCharacterEncoding());
        ar.getResponse().setContentType("application/json;charset=utf-8");

        ar.setBroadcaster(lookupBroadcaster(broadcasterId));

        ar.setSerializer(new Serializer() {

            private Charset charset = ar.getResponse().getCharacterEncoding() == null ? Charset.defaultCharset()
                : Charset.forName(ar.getResponse().getCharacterEncoding());

            @Override
            public void write(final OutputStream os, final Object o) throws IOException {
                if (getCharset() == null) {
                    setCharset(Charset.defaultCharset());
                }
                try {
                    LOG.info("Writing object to JSON outputstream with charset: " + getCharset().displayName());
                    final String payload = mapper.writeValueAsString(o);
                    os.write(payload.getBytes(Charset.defaultCharset()));
                    os.flush();
                } catch (final IOException ex) {
                    throw new IOException("Failed to serialize object to JSON", ex);
                }
            }

            public Charset getCharset() {
                return charset;
            }

            public void setCharset(Charset charset) {
                this.charset = charset;
            }
        });

        ar.suspend();
    }

    @SuppressWarnings("unchecked")
    public void jsonPost(final String broadcasterId, final AtmosphereResource ar) throws IOException {

        final StringBuilder data = new StringBuilder();
        BufferedReader requestReader;
        try {
            requestReader = ar.getRequest().getReader();
            ar.getResponse().setCharacterEncoding("utf-8"); // ar.getRequest().getCharacterEncoding());
            ar.getResponse().setContentType("application/json;charset=utf-8");
            final char[] buf = new char[5120];
            int read = -1;
            while ((read = requestReader.read(buf)) > 0) {
                data.append(buf, 0, read);
            }
            LOG.info("Received json message from client: " + data.toString());

            final Map<String, String> message = mapper.readValue(data.toString(), Map.class);

            lookupBroadcaster("helpline-queue-agent-pe6o").broadcast(message);
            lookupBroadcaster(message.get("broadcasterId")).broadcast(message);

        } catch (final IOException ex) {
            LOG.error("Failed to read request data", ex);
        }

    }

    public void jsonPut(final String broadcasterId, final AtmosphereResource ar) throws IOException {
        LOG.info("Creating broadcaster: " + broadcasterId);
        BroadcasterFactory.getDefault().lookup(broadcasterId, true);
    }


    public void jsonDelete(final String broadcasterId, final AtmosphereResource ar) throws IOException {
        LOG.info("Removing broadcaster: " + broadcasterId);
        BroadcasterFactory.getDefault().remove(broadcasterId);
    }

    @Override
    public void destroy() {
    }

    private Broadcaster lookupBroadcaster(final String broadcasterId) {
        LOG.info("Looking up for broadcaster: " + broadcasterId);
        final Broadcaster broadcaster = BroadcasterFactory.getDefault().lookup(broadcasterId, true);

        LOG.info("Broadcaster found : " + broadcaster.getID());
        return broadcaster;
    }
}
