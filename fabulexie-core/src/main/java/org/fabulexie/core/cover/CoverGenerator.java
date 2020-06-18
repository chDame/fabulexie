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
package org.fabulexie.core.cover;


import java.awt.Color;
import java.awt.Font;
import java.awt.FontFormatException;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.font.FontRenderContext;
import java.awt.font.GlyphVector;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

/**
 * @author christophe.dame
 */
public class CoverGenerator {
	
	private static Font roboto = null;
	
	public static Font getRoboto() throws FontFormatException, IOException {
		if (roboto!=null) {
			return roboto;
		}
		roboto = Font.createFont(Font.TRUETYPE_FONT, CoverGenerator.class.getClassLoader().getResourceAsStream("roboto/Roboto-Medium.ttf"));
		return roboto;
	}
	
	public static BufferedImage buildCover(String author, String title) throws IOException, FontFormatException {
		return buildCover(author, title, CoverGenerator.class.getClassLoader().getResourceAsStream("cover.png"));
	}
	
	public static BufferedImage buildCover(String author, String title, InputStream img) throws IOException, FontFormatException {

		final BufferedImage textImage = ImageIO.read(img);
		int maxWidth = textImage.getWidth() - 40;
		
		Graphics2D g = textImage.createGraphics();
		addText(g, maxWidth, 49f, new Color(0.18f,0.667f, 0.804f, 1f), author, 30, 10);
		addText(g, maxWidth, 70f, new Color(0.255f,0.129f,.039f, 1f), title, 30, 160);
		
		g.dispose();

		return textImage;
	}
	
	private static void addText(Graphics2D g, int maxWidth, float targetedFontSize, Color color, String text, float x, float y) throws FontFormatException, IOException {
		String title1 = text.trim();
		String title2 = null;
		float size = targetedFontSize;
		FontRenderContext frc = g.getFontRenderContext();
		Font font = getRoboto().deriveFont(size);//new Font(Font.SANS_SERIF, Font.BOLD, 250);
		GlyphVector titleVector = font.createGlyphVector(frc, title1);
		if (titleVector.getVisualBounds().getWidth() > maxWidth) {
			
				int midle = title1.length()/2;
				int idxBreak = -1;
				int i=0;
				while (idxBreak<0 && i<midle) {
					if (title1.charAt(midle+i)==' ') {
						idxBreak = midle+i;
					}
					if (title1.charAt(midle-i)==' ') {
						idxBreak = midle-i;
					}
					i++;
				}
				System.out.println(idxBreak);
				if (idxBreak>0) {
					title2 = title1.substring(idxBreak+1);
					title1 = title1.substring(0, idxBreak);
					GlyphVector title1Vector = font.createGlyphVector(frc, title1);
					GlyphVector title2Vector = font.createGlyphVector(frc, title2);
					long titleWidth = Math.round(Math.max(title1Vector.getVisualBounds().getWidth(), title2Vector.getVisualBounds().getWidth()));
					
					if (titleWidth>maxWidth) {
						size = (targetedFontSize*maxWidth)/titleWidth;
					}
				}
			
			font = getRoboto().deriveFont(size);
		}
		
		g.setColor(color);
	    g.setFont(font);
		g.setRenderingHint(
        RenderingHints.KEY_TEXT_ANTIALIASING,
        RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
		g.drawString(title1, x, y+size);
		if (title2!=null) {
			float top = y + size*2 + 10;
			g.drawString(title2, x, top);
		}
	}
}