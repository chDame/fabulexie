/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.fabulexie.core.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Element;
import com.itextpdf.text.Image;
import com.itextpdf.text.log.Level;
import com.itextpdf.text.log.Logger;
import com.itextpdf.text.log.LoggerFactory;
import com.itextpdf.text.pdf.codec.Base64;
import com.itextpdf.tool.xml.NoCustomContextException;
import com.itextpdf.tool.xml.Tag;
import com.itextpdf.tool.xml.WorkerContext;
import com.itextpdf.tool.xml.exceptions.LocaleMessages;
import com.itextpdf.tool.xml.exceptions.RuntimeWorkerException;
import com.itextpdf.tool.xml.html.HTML;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;

public class ImageTagProcessor extends com.itextpdf.tool.xml.html.Image {

private final Logger logger = LoggerFactory.getLogger(getClass());

/*
 * (non-Javadoc)
 * 
 * @see com.itextpdf.tool.xml.TagProcessor#endElement(com.itextpdf.tool.xml.Tag, java.util.List, com.itextpdf.text.Document)
 */
@Override
public List<Element> end(final WorkerContext ctx, final Tag tag, final List<Element> currentContent) {
    final Map<String, String> attributes = tag.getAttributes();
    String src = attributes.get(HTML.Attribute.SRC);
    List<Element> elements = new ArrayList<Element>(1);
    if (null != src && src.length() > 0) {
        Image img = null;
        if (src.startsWith("data:image/")) {
            final String base64Data = src.substring(src.indexOf(",") + 1);
            try {
                img = Image.getInstance(Base64.decode(base64Data));
            } catch (Exception e) {
                if (logger.isLogging(Level.ERROR)) {
                    logger.error(String.format(LocaleMessages.getInstance().getMessage(LocaleMessages.HTML_IMG_RETRIEVE_FAIL), src), e);
                }
            }
            if (img != null) {
                try {
                    final HtmlPipelineContext htmlPipelineContext = getHtmlPipelineContext(ctx);
                    elements.add(getCssAppliers().apply(new Chunk((com.itextpdf.text.Image) getCssAppliers().apply(img, tag, htmlPipelineContext), 0, 0, true), tag,
                        htmlPipelineContext));
                } catch (NoCustomContextException e) {
                    throw new RuntimeWorkerException(e);
                }
            }
        }

        if (img == null) {
            elements = super.end(ctx, tag, currentContent);
        }
    }
    return elements;
}
}