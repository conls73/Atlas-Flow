import sys
from PIL import Image

def process_logo():
    img = Image.open('logo.png').convert('RGBA')
    w, h = img.size
    
    # Text is at bottom, look at top 80% to find the sphere
    cropped = img.crop((0, 0, w, int(h * 0.8)))
    
    left = w
    right = 0
    top = h
    bottom = 0
    
    # Find bounding box of anything green-ish
    for y in range(cropped.height):
        for x in range(cropped.width):
            pixel = cropped.getpixel((x,y))
            # Just check if green channel is reasonably bright
            if pixel[1] > 40:
                if x < left: left = x
                if x > right: right = x
                if y < top: top = y
                if y > bottom: bottom = y
                
    pad = 10
    cx = (left + right) // 2
    cy = (top + bottom) // 2
    size = max(right - left, bottom - top) + pad * 2
    
    # Calculate final square crop box
    final_box = (
        cx - size // 2,
        cy - size // 2,
        cx + size // 2,
        cy + size // 2
    )
    
    final_img = img.crop(final_box)
    
    # To make it "like an SVG," we mask out the dark background for true transparency
    # A simple threshold: if it's very dark, set alpha=0
    newdata = []
    for item in final_img.getdata():
        if item[0] < 45 and item[1] < 45 and item[2] < 45:
            # Setting completely transparent for dark pixels
            newdata.append((item[0], item[1], item[2], 0))
        else:
            newdata.append(item)
            
    final_img.putdata(newdata)
    final_img.save('logo_cropped.png', 'PNG')

if __name__ == '__main__':
    process_logo()
